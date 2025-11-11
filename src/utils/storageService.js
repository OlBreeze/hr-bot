class StorageService {
    static async get(key) {
        try {
            if (!window.storage) {
                // FIX: Return the raw string value directly from localStorage
                const value = localStorage.getItem(key);
                return value;
            }
            const result = await window.storage.get(key);
            // Assuming window.storage returns { value: string }, we extract the string
            return result ? result.value : null;
        } catch (error) {
            console.error(`Error getting ${key}:`, error);
            return null;
        }
    }

    static async set(key, value) {
        try {
            if (!window.storage) {
                localStorage.setItem(key, value);
                return;
            }
            // Canvas storage set often expects the raw value, or {value: string}
            await window.storage.set(key, value);
        } catch (error) {
            console.error(`Error setting ${key}:`, error);
        }
    }

    static async delete(key) {
        try {
            await window.storage.delete(key);
            return true;
        } catch (error) {
            console.error(`Error deleting ${key}:`, error);
            return false;
        }
    }
}

export default StorageService;