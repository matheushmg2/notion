export {};

declare global {
    interface document {
        addEventListener: (event: MouseEvent) => void;
    }
}
