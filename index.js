import app from './app';

const port = process.env.POST || 4000;
app.listen(port, () => {
  console.log('Running a GraphQL API server at localhost:4000/graphql');
});
