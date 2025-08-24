import {ReactNode} from "react";

export interface TrackingPageProps {
  component: ReactNode;
  uid: number;
  page_id: number;
  page_name: string;
};

export interface NotificationData {
  message: string;
  level: string;
}