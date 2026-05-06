export interface PythonLesson {
  id: string;
  title: string;
  level: string;
  goal: string;
  theory: string;
  starterCode: string;
  expectedOutputIncludes: string[];
  successText: string;
}

export const pythonLessons: PythonLesson[] = [
  {
    id: 'print',
    title: 'Вывод текста',
    level: 'урок 1',
    goal: 'Напечатать первую строку в консоль.',
    theory: 'print показывает текст в выводе. Это самый быстрый способ проверить, что код запустился.',
    starterCode: "print('Привет, МКДК!')",
    expectedOutputIncludes: ['Привет, МКДК!'],
    successText: 'Есть первый запуск. Код вывел нужную строку.',
  },
  {
    id: 'variables',
    title: 'Переменные',
    level: 'урок 2',
    goal: 'Сохранить название группы и вывести его.',
    theory: 'Переменная хранит значение. Ее удобно использовать, когда один и тот же текст или число нужны дальше в коде.',
    starterCode: "group = 'ИСИП9'\nprint(group)",
    expectedOutputIncludes: ['ИСИП9'],
    successText: 'Переменная работает. Группа появилась в выводе.',
  },
  {
    id: 'conditions',
    title: 'Условия',
    level: 'урок 3',
    goal: 'Проверить, есть ли замена в расписании.',
    theory: 'if помогает программе выбрать действие. Если условие верное, выполняется один блок кода.',
    starterCode: "replacement = True\nif replacement:\n    print('Есть замена')\nelse:\n    print('Идем по обычному расписанию')",
    expectedOutputIncludes: ['Есть замена'],
    successText: 'Условие сработало. Программа увидела замену.',
  },
  {
    id: 'loops',
    title: 'Циклы',
    level: 'урок 4',
    goal: 'Вывести список пар на день.',
    theory: 'for проходит по списку и повторяет действие для каждого элемента.',
    starterCode: "lessons = ['Базы данных', 'Экономика', 'Английский']\nfor lesson in lessons:\n    print(lesson)",
    expectedOutputIncludes: ['Базы данных', 'Экономика', 'Английский'],
    successText: 'Цикл прошел по списку и вывел все пары.',
  },
  {
    id: 'schedule-project',
    title: 'Мини-проект расписания',
    level: 'урок 5',
    goal: 'Собрать короткий вывод расписания для группы.',
    theory: 'Теперь соединяем переменные, список и цикл. Так появляются маленькие полезные скрипты.',
    starterCode: "group = 'ИСИП9'\nlessons = ['09:00 Python', '10:40 Сети', '12:20 Проект']\nprint('Расписание для ' + group)\nfor lesson in lessons:\n    print(lesson)",
    expectedOutputIncludes: ['Расписание для ИСИП9', '09:00 Python', '10:40 Сети', '12:20 Проект'],
    successText: 'Мини-проект собран. Расписание выводится как список.',
  },
];
