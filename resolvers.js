import faker from 'faker';

const users = []; // Array para almacenar los usuarios
const posts = []; // Array para almacenar las publicaciones

export const resolvers = {
  Query: {
    user: (parent, { id }) => {
      // Búsqueda de un usuario en el array de usuarios
      const user = users.find((user) => user.id === id);
      return user;
    },
    post: (parent, { id }) => {
      // Búsqueda de una publicación en el array de publicaciones
      const post = posts.find((post) => post.id === id);
      return post;
    },
  },
  Mutation: {
    createUser: (parent, { name, email }) => {
      // Creación de un nuevo usuario en el array de usuarios
      const user = {
        id: faker.random.uuid(),
        name: name,
        email: email,
        posts: [],
        friends: [],
      };
      users.push(user);
      return user;
    },
    createPost: (parent, { title, content, authorId }) => {
      // Creación de una nueva publicación en el array de publicaciones
      const post = {
        id: faker.random.uuid(),
        title: title,
        content: content,
        author: authorId,
        comments: [],
      };
      posts.push(post);

      // Actualizar el array de publicaciones del autor
      const author = users.find((user) => user.id === authorId);
      if (author) {
        author.posts.push(post.id);
      }

      return post;
    },
    createComment: (parent, { content, authorId, postId }) => {
        // Creación de un nuevo comentario en la base de datos
        const comment = {
          id: faker.random.uuid(),
          content: content,
          author: authorId,
          post: postId,
        };
        comments.push(comment);
      
        // Actualizar el array de comentarios del autor
        const author = users.find((user) => user.id === authorId);
        if (author) {
          author.comments.push(comment.id);
        }
      
        // Actualizar el array de comentarios de la publicación
        const post = posts.find((post) => post.id === postId);
        if (post) {
          post.comments.push(comment.id);
        }
      
        return comment;
    },
    addFriend: (parent, { userId, friendId }) => {
      // Agregar un amigo a un usuario existente
      const user = users.find((user) => user.id === userId);
      const friend = users.find((user) => user.id === friendId);
      if (user && friend) {
        user.friends.push(friend);
        return user;
      }
      return null;
    },
    deletePost: (parent, { id }) => {
      // Eliminar una publicación por su ID
      const index = posts.findIndex((post) => post.id === id);
      if (index !== -1) {
        posts.splice(index, 1);
        return true;
      }
      return false;
    },
  },
  User: {
    posts: (parent) => {
      // Resolución del campo "posts" para un usuario
      return posts.filter((post) => post.author === parent.id);
    },
    friends: (parent) => {
      // Resolución del campo "friends" para un usuario
      return parent.friends.map((friendId) => users.find((user) => user.id === friendId));
    },
  },
  Post: {
    author: (parent) => {
      // Resolución del campo "author" para una publicación
      return users.find((user) => user.id === parent.author);
    },
    comments: (parent) => {
      // Resolución del campo "comments" para una publicación
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    author: (parent) => {
      // Resolución del campo "author" para un comentario
      return users.find((user) => user.id === parent.author);
    },
    post: (parent) => {
      // Resolución del campo "post" para un comentario
      return posts.find((post) => post.id === parent.post);
    },
  },
};
