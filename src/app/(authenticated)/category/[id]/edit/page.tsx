"use client";
import { useParams } from "next/navigation";
import { useGetDetailCategories } from "../../_hooks";
import FormCategory from "../../_components/form";

const EditAuthorPage = () => {
  const params = useParams();
  const detailAuthor = useGetDetailCategories(params.id.toString());
  return <FormCategory isUpdate={true} data={detailAuthor.data} />;
};

export default EditAuthorPage;
