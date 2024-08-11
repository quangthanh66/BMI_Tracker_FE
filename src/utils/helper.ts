import { imageDb } from "@app/services/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ChangeEvent } from "react";
import { v4 } from "uuid";

export const fieldValidate = {
  required: {
    required: true,
    message: "This field is required",
  },
  email: {
    type: "email",
    message: "The value is invalid email",
  } as any,
};

export type SelectTypes = {
  label: string;
  value: string | number;
};

export const uploadImageFromFirebase = (
  event: ChangeEvent<HTMLInputElement>
): string | undefined => {
  const files = event.target.files;

  if (!files || !files[0]) return "";

  const imageRef = ref(imageDb, `images/${files[0].name + v4()}`);
  uploadBytes(imageRef, files[0]).then((snapshot) => {
    getDownloadURL(snapshot.ref).then((url) => url);
  });
};
