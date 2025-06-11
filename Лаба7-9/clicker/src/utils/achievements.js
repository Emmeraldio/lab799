// src/utils/achievements.js

export const achievements = [
    {
      id: 'click_10',
      title: '10 кліків!',
      condition: ({ totalClicks }) => totalClicks >= 10,
    },
    {
      id: 'click_100',
      title: '100 кліків!',
      condition: ({ totalClicks }) => totalClicks >= 100,
    },
    {
      id: 'credits_1000',
      title: '1000 кредитів!',
      condition: ({ credits }) => credits >= 1000,
    },
    {
      id: 'passive_10',
      title: 'Пасивний дохід 10/сек',
      condition: ({ passiveIncome }) => passiveIncome >= 10,
    },
  ];
  