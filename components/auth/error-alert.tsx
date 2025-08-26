import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { OctagonAlert, Terminal } from "lucide-react"
import React from 'react'

interface ErrorAlertProps {
    error: string
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
    return (
        <Alert className="w-30 bg-destructive/10 dark:bg-destructive/20 border-destructive/50 dark:border-destructive/70 sm:absolute top-0 right-0 sm:m-10">
            <OctagonAlert className="h-4 w-4 !text-destructive" />
            <AlertTitle className="text-red-500">
               {error}
            </AlertTitle>
        </Alert>
    )
}

export default ErrorAlert
