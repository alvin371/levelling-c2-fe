"use client";
import { useParams } from "next/navigation";
import { FormAuthor } from "../../_components/form";
import { useGetDetailCategories } from "../../_hooks";

const EditAuthorPage = () => {
  const params = useParams();
  const detailAuthor = useGetDetailCategories(params.id.toString());
  return <FormAuthor isUpdate={true} data={detailAuthor.data} />;
};

export default EditAuthorPage;
