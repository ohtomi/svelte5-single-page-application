import type {Action} from 'svelte/action';

type Params = () => {
    button: HTMLButtonElement | undefined;
};

export const autoSubmit: Action<HTMLInputElement, Params> = (node: HTMLInputElement, params: Params) => {
    $effect(() => {
        const handleKeyDown = (ke: KeyboardEvent) => {
            if (ke.key !== 'Enter') {
                return;
            }

            const {button} = params();
            button?.click();
        };

        node.addEventListener('keydown', handleKeyDown);

        return () => {
            node.removeEventListener('keydown', handleKeyDown);
        };
    });
};
