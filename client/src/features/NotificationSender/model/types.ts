export type levelType = 'info' | 'warning' | 'critical';

export interface pageType {
  id: number;
  name: string; 
};

export interface notificationDataType {
  level: levelType;
  message: string;
  pages: number[];
}

export interface notificationTemplateType {
  id: string;
  name: string;
  level: levelType;
  message: string;
}

export interface NotificationFormProps {
  onSuccess?: () => void;
};