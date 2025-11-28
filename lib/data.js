import { notifications } from "@/data/notifications";
import { sleep } from "./utils";

export const ITEMS_PER_PAGE = 10; // Number of items per page

export const PROTECTED_SESSION_STORAGE_KEYS = ["user"];

export async function fetchOwnNotifications() {
    await sleep(1000);
    const data = [...notifications];
    return data;
}
