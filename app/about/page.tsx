"use client";

import { useEffect, useState } from "react";
import { getAllUsers, findUserById } from "@/lib/api/users";
import { UserModal } from "../_components/user-modal";
import { AboutHero } from "./_components/about-hero";
import { UsersList } from "./_components/users-list";
import { AboutHeader } from "./_components/about-header";
import { AboutFooter } from "./_components/about.footer";
import type { User } from "@/types/user.types";

export default function AboutPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setIsLoading(true);
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error loading users:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleUserClick = async (userId: string) => {
        try {
            const user = await findUserById(userId);
            if (user) {
                setSelectedUser(user);
                setIsUserModalOpen(true);
            }
        } catch (error) {
            console.error("Error finding user:", error);
        }
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#00061e] to-black">
            <AboutHeader />

            <main className="max-w-4xl mx-auto px-4 py-8">
                <AboutHero />
                <UsersList
                    users={users}
                    isLoading={isLoading}
                    onUserClick={handleUserClick}
                />
            </main>
            <AboutFooter />
            <UserModal
                user={selectedUser}
                isOpen={isUserModalOpen}
                onClose={closeUserModal}
            />
        </div>
    );
}
