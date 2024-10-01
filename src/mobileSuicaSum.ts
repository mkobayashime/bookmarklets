/**
 * @title Mobile Suica - Sum checked payments
 * @description モバイルSuicaの利用履歴ページでチェックの入っている支払いの合計額を計算します
 */

const calc = () => {
  const rows = Array.from(document.querySelectorAll(".historyTable tr")).slice(
    1,
  );

  return rows.reduce((sum, curRow) => {
    const checkbox = curRow.querySelector<HTMLInputElement>(
      "input[type='checkbox']",
    );
    if (!checkbox || !checkbox.checked) return sum;

    const amountElement = Array.from(curRow.children).pop();
    if (!amountElement || !(amountElement instanceof HTMLElement)) return sum;

    if (!amountElement?.innerText) return sum;

    const amount = amountElement.innerText;
    if (!amount.startsWith("-")) return sum;

    const amountInNumber =
      Number.parseInt(amount.replace("-", "").replace(",", "")) || 0;
    return sum + amountInNumber;
  }, 0);
};

if (
  window.location.href.startsWith(
    "https://www.mobilesuica.com/iq/ir/SuicaDisp.aspx",
  )
) {
  window.alert(`${calc()}円`);
}
