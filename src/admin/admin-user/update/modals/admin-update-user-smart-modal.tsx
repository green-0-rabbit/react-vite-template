/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  ReactiveModal,
  ReactiveModalProps
} from "src/common/components/molecules";
import AdminDeleteUserModal, {
  AdminDeleteUserModalProps
} from "./admin-delete-user-modal";

/** Put this piece outside of React component is a kind of natif memoized technique */
const components = {
  loading: () => <span />,
  deleteUser: (modalProps: AdminDeleteUserModalProps) => (
    <AdminDeleteUserModal {...modalProps} />
  )
};

type ModalKeys = keyof typeof components;
// type MM = ReactiveModalProps<"deleteUser", typeof components>;

const AdminUpdateUserSmartModal = <T extends ModalKeys>(
  props: ReactiveModalProps<T, typeof components>
) => <ReactiveModal {...props} components={components} />;

export default AdminUpdateUserSmartModal;
