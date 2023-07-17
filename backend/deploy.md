### Установил Vue.js
`npm install -g @vue/cli`

### Обновил vue.config.js

```
module.exports = {
    ...
    publicPath: "/dist",
    outputDir: "./dist/",
    ...
};
```

`npm run build`

### Обновил urls.py

```
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

urlpatterns = [
    ...
    re_path("^.*$", TemplateView.as_view(template_name="index.html")),
]
```

### Сообщил Django, где искать сгенерированные шаблоны

```
TEMPLATES = [
    {
        ...
        'DIRS': [ BASE_DIR / "vue_project/dist" ],
        ...
    },
]
```

### На странице веб-приложения добавил сопоставление статических файлов в dist каталог

```
/dist/ : /home/username/mysite/frontend/dist
```