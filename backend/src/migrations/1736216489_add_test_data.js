exports.up = async function (knex) {
  // Добавление тестовых данных в таблицу menus
  const menus = [
    { day: 'Monday', variant: 'Option 1' },
    { day: 'Tuesday', variant: 'Option 1' },
  ];

  const menuIds = await knex('menus').insert(menus).returning('id');

  // Добавление тестовых данных в таблицу dishes
  const dishes = [
    { name: 'Caesar Salad', type: 'салат' },
    { name: 'Borscht', type: 'первое' },
    { name: 'Grilled Chicken', type: 'второе' },
    { name: 'Apple Juice', type: 'напиток' },
    { name: 'Chocolate Cake', type: 'десерт' },
    { name: 'Greek Salad', type: 'салат' },
    { name: 'Tomato Soup', type: 'первое' },
  ];

  const dishIds = await knex('dishes').insert(dishes).returning(['id', 'type']);

  // Проверка корректности данных
  if (!menuIds.length || !dishIds.length) {
    throw new Error('Ошибка при создании тестовых данных');
  }

  // Формирование связей для таблицы menu_dishes
  const menuDishes = [
    { menu_id: menuIds[0], dish_type: 'салат' },
    { menu_id: menuIds[0], dish_type: 'первое' },
    { menu_id: menuIds[0], dish_type: 'второе' },
    { menu_id: menuIds[0], dish_type: 'напиток' },
    { menu_id: menuIds[0], dish_type: 'десерт' },
    { menu_id: menuIds[1], dish_type: 'салат' },
    { menu_id: menuIds[1], dish_type: 'первое' },
  ];

  const mappedMenuDishes = menuDishes.map(({ menu_id, dish_type }) => {
    const dish = dishIds.find((d) => d.type === dish_type);
    if (!dish) {
      throw new Error(`Блюдо с типом "${dish_type}" не найдено`);
    }
    return {
      menu_id: menu_id.id || menu_id, // Убедиться, что это число
      dish_id: dish.id,
    };
  });

  await knex('menu_dishes').insert(mappedMenuDishes);
};

exports.down = async function (knex) {
  await knex('menu_dishes').truncate();
  await knex('dishes').truncate();
  await knex('menus').truncate();
};
