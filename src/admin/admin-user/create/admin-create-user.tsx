/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  ReactiveListButton,
  RenderButtonType,
  Loading
} from "src/common/components/molecules";
import { observer } from "mobx-react-lite";
import { IBaseService } from "src/common/types";
import {
  ReactiveFormWithList,
  IFieldGroupMeta
} from "../../../common/components/molecules";
import { fieldRegex } from "../../../common/utils";
import { AdminCreateUserPayloadType } from "./payloads";
import { Form } from "../../../common/components/atoms";
import { useServices } from "../../../common/hooks";
import { IAdminCreateUserServices as IService } from "./types";
import { AdminCreateUserSmartModal } from "./modals";

const AdminCreateUser: FC = observer(() => {
  type Data = AdminCreateUserPayloadType;
  const navigate = useNavigate();
  const { admin, userStore, logger } = useServices<IService & IBaseService>();
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {
    formState: { errors, dirtyFields }
  } = methods;
  useEffect(() => {
    userStore.servicesRegister({ admin, logger, navigate, methods });
    userStore.loadData();
  }, [userStore]);

  useEffect(() => {
    userStore.dirtyFields = dirtyFields;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dirtyFields)]);

  const fieldsGroupMeta: IFieldGroupMeta<Data>[] = [
    {
      groupName: "Authentification",
      groupLayouts: [
        {
          rowStart: 2,
          columnStart: 1,
          colSpan: 3,
          fieldGroups: [
            {
              inputKey: "authData.attributes",
              rowSpan: 1
            }
          ]
        },
        {
          rowStart: 3,
          columnStart: 1,
          colSpan: 1,
          fieldGroups: [
            {
              inputKey: "actions.tempPassword",
              rowSpan: 1
            },
            {
              inputKey: "actions.sendTempPassword",
              rowSpan: 1
            }
          ]
        }
      ],
      fieldsMeta: [
        {
          inputKey: "authData.username",
          label: "Email",
          inputType: "text",
          options: {
            required: { value: true, message: "the field is required" },
            pattern: {
              value: fieldRegex.email,
              message: "please provide a valid email"
            }
          },
          customProps: {
            handleChange: ({ methods: m, event }) => {
              const { setValue } = m;
              const { value } = event.target;
              setValue("authData.attributes.0.value", value);
            }
          }
        },
        {
          inputKey: "actions.tempPassword",
          label: "Temporary password",
          inputType: "password",
          options: {
            pattern: {
              value: fieldRegex.password,
              message:
                "The password should at least contains 10 characters (1 lower, 1 upper, 1 number and 1 special character)"
            }
          }
        },
        {
          inputKey: "actions.sendTempPassword",
          label: "",
          inputType: "checkbox",
          customProps: {
            color: "secondary",
            label: "Send password to user"
          }
        },
        {
          inputKey: "authData.attributes",
          label: "Attributes",
          inputType: "list",
          options: { required: true },
          customProps: {
            fieldsMeta: [
              {
                label: "Name",
                inputKey: "name",
                inputType: "text",
                options: { required: { value: true, message: "is required" } },
                customProps: {
                  color: "primary",
                  disabled: true
                }
              },
              {
                label: "Value",
                inputKey: "value",
                inputType: "text",
                options: { required: { value: true, message: "is required" } },
                customProps: {
                  color: "primary",
                  disabled: true
                }
              },
              {
                label: "Verified",
                inputKey: "isVerified",
                inputType: "checkbox",
                customProps: {
                  color: "secondary"
                }
              }
            ]
          }
        }
      ]
    },
    {
      groupName: "Account info",
      fieldsMeta: [
        {
          inputKey: "userType",
          label: "User Type",
          inputType: "select",
          customProps: {
            options: [
              "admin",
              "author",
              "contractor",
              "contributor",
              "business_developer",
              "customer"
            ]
          }
        },
        {
          inputKey: "authData.userGroups",
          label: "User Roles",
          inputType: "multiSelect",
          options: { required: true },
          customProps: {
            label: "User Roles",
            options: [
              "Admin",
              "BusinessDeveloper",
              "Contractor",
              "Customer",
              "Technician"
            ],
            selectType: "checkmarks"
          }
        }
      ]
    },
    {
      groupName: "Contact",
      fieldsMeta: [
        {
          inputKey: "contact.firstName",
          label: "First Name",
          inputType: "text",
          options: { required: { value: true, message: "is required" } },
          customProps: { color: "info" }
        },
        {
          inputKey: "contact.lastName",
          label: "Last Name",
          inputType: "text",
          options: { required: { value: true, message: "is required" } }
        },
        {
          inputKey: "contact.language",
          label: "Language",
          inputType: "select",
          customProps: {
            options: ["fr", "en"]
          }
        },
        {
          inputKey: "contact.facebook",
          label: "Facebook Link",
          inputType: "text"
        },
        {
          inputKey: "contact.Image",
          label: "Image Link",
          inputType: "text"
        },
        {
          inputKey: "contact.linkedin",
          label: "Linkedin Link",
          inputType: "text"
        }
      ]
    },
    {
      groupName: "Adresse",
      fieldsMeta: [
        {
          inputKey: "address.name",
          label: "Name",
          inputType: "text"
        },
        {
          inputKey: "address.address1",
          label: "Adresse 1",
          inputType: "text"
        },
        {
          inputKey: "address.address2",
          label: "Adresse 2",
          inputType: "text"
        },
        {
          inputKey: "address.city",
          label: "City",
          inputType: "text"
        },
        {
          inputKey: "address.province",
          label: "Province",
          inputType: "text"
        },
        {
          inputKey: "address.provinceCode",
          label: "Province Code",
          inputType: "text"
        },
        {
          inputKey: "address.country",
          label: "Country",
          inputType: "text"
        },
        {
          inputKey: "address.countryCode",
          label: "Country Code",
          inputType: "text"
        },
        {
          inputKey: "address.zip",
          label: "ZIP",
          inputType: "text"
        },
        {
          inputKey: "address.latitude",
          label: "Latitude",
          inputType: "text"
        },
        {
          inputKey: "address.longitude",
          label: "Longitude",
          inputType: "text"
        }
      ]
    }
  ];

  const buttonsHeadMeta: RenderButtonType[] = [
    {
      name: "Create",
      type: "button",
      isDisable: !userStore.isDirty,
      fontProps: {
        fontWeight: "light",
        color: ""
      },
      customProps: { type: "submit" }
    }
  ];

  return (
    <Form onSubmit={handleSubmit(userStore.onSubmit)}>
      <ReactiveListButton actionsMeta={buttonsHeadMeta} position="end" />
      <ReactiveFormWithList
        methods={methods}
        fieldsGroupMeta={fieldsGroupMeta}
        errors={errors}
        data={userStore.dataJSON}
      />
      <Loading
        isLoading={userStore.isLoading}
        renderModal={(isModalOpen) => (
          <AdminCreateUserSmartModal
            modalKey="loading"
            isModalOpen={isModalOpen}
          />
        )}
      />
    </Form>
  );
});

export default AdminCreateUser;
