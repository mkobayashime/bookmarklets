/**
 * @title 入力中の値を全角に変換
 * @description フォームなどで入力欄に入力中の値のうち、半角の数値などを全角に変換します
 */

const toZenkaku = (str: string) =>
	str
		.replaceAll(/[A-Za-z0-9]/g, (s: string) =>
			String.fromCharCode(s.charCodeAt(0) + 0xfee0),
		)
		.replaceAll(" ", "　")
		.replaceAll("-", "－");

void (() => {
	const { activeElement } = document;

	if (!(activeElement instanceof HTMLInputElement)) return;

	activeElement.value = toZenkaku(activeElement.value);
})();
