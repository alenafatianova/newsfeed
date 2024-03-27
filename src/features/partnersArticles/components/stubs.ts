import { PartnersPostsType } from '../types'

export const partnerArticleStub: Omit<PartnersPostsType, 'id'> = {
  image: '',
  'company-name': 'Horses and Bosses',
  articleTitle: 'This is a great title!',
  description: 'This description consists from letters and words and contains some random information',
  created: {
    seconds: new Date().getSeconds(),
    nanoseconds: new Date().getMilliseconds(),
  },
  text: 'Some text',
}

export const PartnersArticlesFirebaseStub = {
  documents: [
    {
      name: 'projects/karpov-news-1b158/databases/(default)/documents/partners-posts/VYgSNQYXsgXwXc0VsUqQ',
      fields: {
        text: {
          stringValue:
            'В первой части мы говорили о первой загрузке и работе с ресурсами. Сегодня я расскажу о второй части оптимизации производительности фронтенда. О том, что происходит с нашей страницей, когда она загружена, на что уходит процессорное время и что с этим делать. Ключевые слова: event loop, paint \\ repaint, layout \\ reflow, composite',
        },
        'company-name': {
          stringValue: 'https://habr.com/',
        },
        created: {
          timestampValue: '2023-03-29T07:07:12.259Z',
        },
        articleTitle: {
          stringValue: 'Оптимизация производительности фронтенда.',
        },
        description: {
          stringValue:
            'Ночь. Стук в дверь. Открыть. Стоят двое. "Верите ли вы в Event loop, нашу главную браузерную цепочку?" Вздохнуть. Закрыть дверь. Лечь досыпать. До начала рабочего дня еще 4 часа. А там уже ивент лупы, лейауты и прочая радость…',
        },
        image: {
          stringValue: 'https://habrastorage.org/r/w1560/webt/cz/0t/es/cz0tesg1-bt98lxonljzgrz_5ny.jpeg',
        },
      },
      createTime: '2023-03-27T10:45:41.788492Z',
      updateTime: '2023-05-15T08:47:05.352779Z',
    },
    {
      name: 'projects/karpov-news-1b158/databases/(default)/documents/partners-posts/hwZyI5qQXST8GKc3svnL',
      fields: {
        text: {
          stringValue:
            'Что такое Lorem Ipsum?\nLorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\nПочему он используется?\nДавно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).\n\n\nОткуда он появился?\nМногие думают, что Lorem Ipsum - взятый с потолка псевдо-латинский набор слов, но это не совсем так. Его корни уходят в один фрагмент классической латыни 45 года н.э., то есть более двух тысячелетий назад. Ричард МакКлинток, профессор латыни из колледжа Hampden-Sydney, штат Вирджиния, взял одно из самых странных слов в Lorem Ipsum, "consectetur", и занялся его поисками в классической латинской литературе. В результате он нашёл неоспоримый первоисточник Lorem Ipsum в разделах 1.10.32 и 1.10.33 книги "de Finibus Bonorum et Malorum" ("О пределах добра и зла"), написанной Цицероном в 45 году н.э. Этот трактат по теории этики был очень популярен в эпоху Возрождения. Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32',
        },
        created: {
          timestampValue: '2023-03-30T10:02:28.794Z',
        },
        image: {
          stringValue:
            'https://firebasestorage.googleapis.com/v0/b/karpov-news-1b158.appspot.com/o/3d-pastel-fluid-wallpaper-1920x1200_6.jpeg%20-%201680022779037?alt=media&token=a7028056-dc14-4db0-95ca-c3957fdb6fb7',
        },
        description: {
          stringValue: 'Очень важная подводка к статье',
        },
        'company-name': {
          stringValue: 'Деловая компания',
        },
        articleTitle: {
          stringValue: 'Важное название',
        },
      },
      createTime: '2023-03-28T16:59:48.798007Z',
      updateTime: '2023-03-30T12:02:38.759557Z',
    },
  ],
}
