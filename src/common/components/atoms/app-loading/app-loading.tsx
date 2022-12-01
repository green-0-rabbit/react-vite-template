import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useService } from "react-service-locator";
import { wait } from "src/common/utils";
import { UiStore } from "src/core/stores";
import LoadingComponent from "./loading";

const AppLoading: FC = (props) => {
  const uiStore = useService(UiStore);
  const [isLoading, setIsLoading] = useState(false);

  const updateLoading = async (isLoading = false) => {
    setIsLoading(isLoading);
  };
  useEffect(() => {
    updateLoading(uiStore.isLoading);
  }, [uiStore.isLoading]);

  return <LoadingComponent visible={isLoading} />;
};
export default observer(AppLoading);
