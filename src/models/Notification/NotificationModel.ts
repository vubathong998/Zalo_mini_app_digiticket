export type NotificationModel = {
    id: string;
    title: string;
    description: string;
    image: string;
    isRead?: boolean;
    createdAt: string;
    from?: Record<string, any>;
    mentionData?: Record<string, { id: string; type: string } & Record<string, any>>;
};
