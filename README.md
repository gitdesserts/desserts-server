# desserts-server

POST /session

```
summary: 임시 로그인 결과를 반환합니다.
  responses:
    200:
      schema:
        type: object
        properties:
          permission:
            type: boolean
```

```
{
    "permission": true
}
```
