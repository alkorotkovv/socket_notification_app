import { Button } from "antd";
import {useState} from "react";
// import Popup from "@/shared/ui/Popup/Popup";
import {NotificationForm} from "./NotificationForm/NotificationForm";

export const NotificationSender = () => {

  const [isPopupOpened, setIsPopupOpened] = useState(false)

  return (
    <>
    <div style={{marginLeft: 'auto'}}>
      <Button onClick={() => setIsPopupOpened(true)}>
        Отправить уведомление
      </Button>
    </div>
    {/* {isPopupOpened &&
      <Popup title={'Отправка уведомлений'} isOpen={true} onClose={() => setIsPopupOpened(false)}>
        <NotificationForm/>
      </Popup>
    } */}
    </>
  );
};