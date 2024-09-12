"use client";
import { useParams } from "next/navigation";
import { FormAuthor } from "../../_components/form";
import { useGetDetailAuthor } from "@/app/(authenticated)/author/_hooks";

const EditAuthorPage = () => {
  const params = useParams();
  const detailAuthor = useGetDetailAuthor(params.id.toString());
  return <FormAuthor isUpdate={true} data={detailAuthor.data} />;
};

export default EditAuthorPage;
