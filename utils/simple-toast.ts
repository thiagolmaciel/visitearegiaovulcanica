import { toast } from "sonner";

export function simpleToast(message: string, type?: string) {
    switch (type) {
        case 'success':
            toast.success((message), {
                duration: 2000
            });
            break
        case 'error':
            toast.error((message), {
                duration: 2000
            });
            break
        case 'info':
            toast.info((message), {
                duration: 2000
            });
            break
        case 'warning':
            toast.warning((message), {
                duration: 2000
            });
            break
        default:
            toast((message), {
                duration: 2000
            });
    }


}