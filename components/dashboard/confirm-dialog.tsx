'use client'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Button } from '../ui/button'

interface ConfirmDialogProps {
    open: boolean
    onClose: (confirmed: boolean) => void
    title?: string
    description?: string
}
const ConfirmDialog = ({ open, onClose, title = 'Confirmar ação', description }: ConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-2">
                    <Button onClick={() => onClose(false)}>Cancelar</Button>
                    <Button onClick={() => onClose(true)}>Confirmar</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default ConfirmDialog
