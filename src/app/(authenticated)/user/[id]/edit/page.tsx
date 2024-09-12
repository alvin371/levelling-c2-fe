"use client";
import { useParams } from "next/navigation";
import { useGetDetailUser } from "../../_hooks";
import FormAuthor from "../../_components/form";

const EditAuthorPage = () => {
  const params = useParams();
  const detailAuthor = useGetDetailUser(params.id.toString());
  return <FormAuthor isUpdate={true} data={detailAuthor.data} />;
};

export default EditAuthorPage;
