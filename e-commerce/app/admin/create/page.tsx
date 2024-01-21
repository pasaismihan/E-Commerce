import React from "react";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import WarningText from "@/app/components/WarningText";
import AuthContainer from "@/app/components/containers/AuthContainer";
import CreateForm from "@/app/components/admin/CreateForm";

const CreateProduct = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya Girişin Yasak !" />;
  }

  return (
    <AuthContainer>
      <CreateForm />
    </AuthContainer>
  );
};

export default CreateProduct;
