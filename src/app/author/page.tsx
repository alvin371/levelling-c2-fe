import AuthorClient from "./_components/client";

const AuthorPage = async () => {
  const author = await fetch("http://localhost:3000/api/authors");
  const authorJson = await author.json();
  return <AuthorClient author={authorJson.data.authors} />;
};

export default AuthorPage;
