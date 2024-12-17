"use client";

import React, { useEffect, useState } from "react";
import {
    FacebookShareButton,
    FacebookIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from "next-share";

import { Modal } from "../ui/modal";
import { Button } from "../ui/button";

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    loading?: boolean;
}

const ShareModal = ({
    isOpen,
    onClose,
}: ShareModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        setIsMounted(true);

        // Safely access window.location on the client-side
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
        }
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Modal
                title="Share this post"
                description="Share this post to anywhere"
                isOpen={isOpen}
                onClose={onClose}
            >
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex justify-center gap-4">
                        <FacebookShareButton
                            url={currentUrl}
                            quote={"Check out this amazing post!"}
                            hashtag={"#nextshare"}
                        >
                            <FacebookIcon size={48} round />
                        </FacebookShareButton>

                        <WhatsappShareButton
                            url={currentUrl}
                            title={"Check out this amazing post!"}
                            separator=":: "
                        >
                            <WhatsappIcon size={48} round />
                        </WhatsappShareButton>

                        <LinkedinShareButton url={currentUrl}>
                            <LinkedinIcon size={48} round />
                        </LinkedinShareButton>
                    </div>
                    <div className="pt-6 flex items-center justify-end w-full">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ShareModal;
