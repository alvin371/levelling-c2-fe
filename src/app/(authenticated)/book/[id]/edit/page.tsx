"use client";
import { useParams } from "next/navigation";
import FormBook from "../../_components/form";
import { useGetDetailBook } from "../../_hooks";

const EditAuthorPage = () => {
  const params = useParams();
  const detailAuthor = useGetDetailBook(params.id.toString());
  return <FormBook isUpdate={true} data={detailAuthor.data} />;
};

export default EditAuthorPage;
