import { useFormik } from "formik";
import React, { useState } from "react";
import {
  ContainerGender,
  ContainerBlockSeting,
  ContainerInfoUser,
  ContainerChangePass,
  LabelInput,
  InputStyle,
  ButtonSubmit,
  FirstTitle,
} from "./SettingModal.styled";
import { InputPassword, TitleNameSet } from "./Component/ComponentSeting";
import { useDispatch, useSelector } from "react-redux";
import { selectIsUser } from "../../redux/auth/selectorsAuth";
import { AddSetingUser } from "../../redux/auth/authOperationApi";
import sprite from "../../common/symbol-defs.svg";
import variables from "common/Variables";

// ===================================================================
export default function FormInput() {
  const dispatch = useDispatch();
  const { userName, email: mail, gender } = useSelector(selectIsUser);
  const [error, setError] = useState("");
  const [genders, setGenders] = useState(gender);

  const initialValues = {
    userName,
    email: mail,
    gender: genders,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,

    onSubmit: (values) => {
      const fieldsToUpdate = {};

      for (const key in initialValues) {
        if (initialValues[key] !== values[key]) {
          fieldsToUpdate[key] = values[key];
        }
      }
      const isEmpty = Object.keys(fieldsToUpdate).length === 0;
      if (isEmpty) {
      }
      dispatch(AddSetingUser(fieldsToUpdate));
    },
  });
  console.log(formik.values);
  const handleBlure = (evt) => {
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const validName = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'’]{1,32}$/;
    const value = evt.target.value.toString();
    const id = evt.target.id;
    const valiSchema = "userName" === id ? validName : validEmail;

    if (valiSchema.test(value)) {
      setError("");
      return;
    }
    setError(id);
    if (value.length === 0) {
      setError("");
    }
  };

  const errorBorderStyleK = {
    border: `1px solid ${variables.secondaryRed} `,
  };

  return (
    <>
      <ContainerBlockSeting>
        <ContainerInfoUser>
          <FirstTitle>Your gender identity</FirstTitle>
          <form onSubmit={formik.handleSubmit}>
            <ContainerGender>
              <label htmlFor="girl">
                {formik.values.gender === "girl" ? (
                  <svg width={16} height={16}>
                    <use href={`${sprite}#radio-btn-active`} />
                  </svg>
                ) : (
                  <svg width={16} height={16}>
                    <use href={`${sprite}#radio-btn`} />
                  </svg>
                )}

                <input
                  id="girl"
                  type="radio"
                  name="gender"
                  value="girl"
                  checked={formik.values.gender === "girl"}
                  onChange={setGenders}
                />
                <span>Girl</span>
              </label>

              <label htmlFor="man">
                {formik.values.gender === "girl" ? (
                  <svg width={16} height={16}>
                    <use href={`${sprite}#radio-btn`} />
                  </svg>
                ) : (
                  <svg width={16} height={16}>
                    <use href={`${sprite}#radio-btn-active`} />
                  </svg>
                )}
                <input
                  id="man"
                  type="radio"
                  name="gender"
                  value="man"
                  checked={formik.values.gender === "man"}
                  onChange={formik.handleChange}
                />
                <span>Man</span>
              </label>
            </ContainerGender>

            <TitleNameSet title={"Your name"}></TitleNameSet>
            <InputStyle
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.userName}
              className="ttt"
              onBlur={handleBlure}
              style={error === "userName" ? errorBorderStyleK : null}
            />
            <TitleNameSet title={"E-mail"}></TitleNameSet>
            <InputStyle
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="last"
              onBlur={handleBlure}
              style={error === "email" ? errorBorderStyleK : null}
            />
          </form>
        </ContainerInfoUser>
        <ContainerChangePass>
          <form onSubmit={formik.handleSubmit}>
            <FirstTitle>Password</FirstTitle>
            <LabelInput htmlFor="oldPassword">Outdated password:</LabelInput>
            <InputPassword
              formik={formik}
              id={"oldPassword"}
              name={"oldPassword"}
              placeholder={"Password"}
              value={formik.values.oldPassword}
            />

            <LabelInput htmlFor="newPassword">New Password:</LabelInput>
            <InputPassword
              formik={formik}
              id={"newPassword"}
              name={"newPassword"}
              placeholder={"Password"}
              value={formik.values.newPassword}
            />

            <LabelInput htmlFor="confirmNewPassword">
              Repeat new password:
            </LabelInput>
            <InputPassword
              formik={formik}
              id={"confirmNewPassword"}
              name={"confirmNewPassword"}
              placeholder={"Password"}
              value={formik.values.confirmNewPassword}
            />
            <div>
              <ButtonSubmit type="submit">Save</ButtonSubmit>
            </div>
          </form>
        </ContainerChangePass>
      </ContainerBlockSeting>
    </>
  );
}
