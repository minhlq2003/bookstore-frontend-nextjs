"use client";

import { message } from "antd";
import { useState } from "react";

const API_PREFIX_USERS_PATH = "/api/users";
const API_PREFIX_ROLES_PATH = "/api/users-permissions/roles";

const UserService = () => {
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (updatePayload: any) => {};

  const getUserById = async (id: number) => {};

  const fetchAllUsers = async (
    searchTerms: { [key: string]: string } = {}
  ) => {};

  const fetchAllRoles = async (
    searchTerms: { [key: string]: string } = {}
  ) => {};

  const updateUser = async (id: number, updatePayload: any) => {};

  const deleteUser = async (id: number) => {};

  return {
    isLoading,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    fetchAllUsers,
    fetchAllRoles,
  };
};

export default UserService;
