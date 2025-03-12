/**
 * @title Open Parcel Tracking URL
 * @description
 * 入力された問い合わせ番号の荷物の追跡ページを開きます\n
 * 対応配送会社: クロネコヤマト/佐川急便/日本郵便
 */

const sites = ["kuronekoyamato", "sagawa", "japanpost"] as const;

type Site = (typeof sites)[number];

const detectSite = (): Site | undefined => {
	if (window.location.host.endsWith("kuronekoyamato.co.jp")) {
		return "kuronekoyamato";
	}

	if (window.location.host.endsWith("sagawa-exp.co.jp")) {
		return "sagawa";
	}

	if (window.location.host.endsWith("japanpost.jp")) {
		return "japanpost";
	}

	const code = window.prompt(
		`
配送会社を選択してください:
1 クロネコヤマト
2 佐川急便
3 日本郵便(ゆうパック)
`.trim(),
	);

	switch (code?.trim()) {
		case "1": {
			return "kuronekoyamato";
		}
		case "2": {
			return "sagawa";
		}
		case "3": {
			return "japanpost";
		}
	}
};

const getURL = (site: Site): string | undefined => {
	const id = window.prompt("問い合わせ番号を入力")?.trim();
	if (!id) return;

	switch (site) {
		case "kuronekoyamato": {
			return `https://member.kms.kuronekoyamato.co.jp/parcel/detail?pno=${id.replaceAll("-", "")}`;
		}
		case "sagawa": {
			return `https://k2k.sagawa-exp.co.jp/p/web/okurijosearch.do?oku01=${id.replaceAll("-", "")}`;
		}
		case "japanpost": {
			return `https://trackings.post.japanpost.jp/services/srv/search/direct?searchKind=S003&locale=ja&SVID=023&reqCodeNo1=${id}`;
		}
		default: {
			return site satisfies never;
		}
	}
};

void (() => {
	const site = detectSite();
	if (!site) return;

	const url = getURL(site);
	if (!url) return;

	window.open(url);
})();
