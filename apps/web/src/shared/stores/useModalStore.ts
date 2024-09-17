import type { ReactNode } from 'react';
import { create } from 'zustand';

type ModalStore = {
	title: string;
	size?: 'sm' | 'md' | 'lg';
	isOpen: boolean;
	content: ReactNode | null;
	open: ({
		title,
		content,
		size,
	}: {
		content: ReactNode;
		title?: string;
		size?: 'sm' | 'md' | 'lg';
	}) => void;
	close: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
	isOpen: false,
	content: null,
	size: 'md',
	title: '',
	open({ title, content, size }) {
		set({ title, content, isOpen: true, size });
	},
	close() {
		set({ isOpen: false });
		setTimeout(() => set({ title: '', content: null, size: 'md' }), 300);
	},
}));
