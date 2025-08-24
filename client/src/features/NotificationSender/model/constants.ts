import { notificationTemplateType } from './types';

export const CONST_NOTIFICATION_TEMPLATES: notificationTemplateType[] = [
  {
    id: 'restart-10min',
    name: 'Перезагрузка за 10 мин',
    level: 'info',
    message: 'Запланированы технические работы. Сервер будет перезагружен через 10 минут. Пожалуйста, сохраните вашу работу'
  },
  {
    id: 'restart-5min',
    name: 'Перезагрузка за 5 мин',
    message: 'Предупреждение! Завершите работу! Сервер перезагружается через 1 минуту!',
    level: 'warning'
  },
  {
    id: 'restart-1min',
    name: 'Перезагрузка за 1 мин',
    message: 'ВНИМАНИЕ! Завершите работу! Сервер перезагружается через 1 минуту!',
    level: 'critical'
  },
]