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

GET http://ec2-54-180-88-127.ap-northeast-2.compute.amazonaws.com/questions

```
summary: 질문 리스트를 반환합니다.
  responses:
    200:
      schema:
        type: object
        properties:
          questions:
            type: array
            items:
              id:
                type: number
              content:
                type: string
              type:
                type: string
```

```
[
    {
        "id": 18,
        "content": "규칙적인 일상을 유지하고 있나요?",
        "type": "positive"
    },
    {
        "id": 24,
        "content": "오늘 하루 기분 좋았던 순간이 있었나요?",
        "type": "positive"
    },
    {
        "id": 105,
        "content": "결정하는 것이 너무 어렵다고 느껴지나요?",
        "type": "negative"
    },
    {
        "id": 54,
        "content": "평소보다 피곤한가요?",
        "type": "negative"
    },
    {
        "id": 125,
        "content": "오늘 하루 소리내어 웃은 적 있나요?",
        "type": "normal"
    }
]
```
