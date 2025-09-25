'use client';

import * as React from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type ConfirmationDialogProps = {
    title: string;
    body: string;
    triggerButton: React.ReactNode;
    confirmButton: React.ReactNode;
    icon?: React.ReactNode;
};

export const ConfirmationDialog = ({
    title,
    body,
    triggerButton,
    confirmButton,
    icon,
}: ConfirmationDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{triggerButton}</DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {icon} {title}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="mt-2">{body}</DialogDescription>

                <div className="mt-4 flex justify-end gap-2">
                    {/* Cancel button */}
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            Cancel
                        </Button>
                    </DialogTrigger>

                    {/* Confirm button tetap dari props */}
                    {confirmButton}
                </div>
            </DialogContent>
        </Dialog>
    );
};
