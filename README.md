# desserts-server

## POST /session

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

## GET /questions

```
summary: 질문 리스트를 반환합니다.
responses:
  200:
    schema:
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
      "id": 6,
      "content": "오늘 외출을 했나요?",
      "type": "positive"
  },
  {
      "id": 3,
      "content": "내일이 기대되나요?",
      "type": "positive"
  },
  {
      "id": 64,
      "content": "일상을 탈출하고 싶은가요?",
      "type": "negative"
  },
  {
      "id": 105,
      "content": "결정하는 것이 너무 어렵다고 느껴지나요?",
      "type": "negative"
  },
  {
      "id": 121,
      "content": "오늘 '사랑해'라고 말해보았나요?",
      "type": "normal"
  }
]
```

## POST /results

```
summary: 질문의 결과를 생성합니다.
requestBody:
  required: true
  content:
    application/json:
      schema:
        properties:
          results: array
          items:
            type: object
            properties:
              id:
                type: number
              score:
                type: number

responses:
  200:
    schema:
      type: object
      properties:
        id:
          type: number
        score:
          type: number
        creator:
          type: number
        createAt:
          type: string

```

### requestBody

```
{ results:
  [ { id: 1, score: 1 },
    { id: 2, score: 0 },
    { id: 3, score: 1 },
    { id: 4, score: -1 },
    { id: 5, score: 1 }
  ]
}
```

### responses

```
{
    "creator": 1,
    "score": 2,
    "id": 1,
    "createAt": "2019-07-06T07:58:06.000Z"
}
```

## GET /results/week

```
summary: 한 주의 점수를 가져옵니다. 데이터가 없으면 -1을 표시합니다.
requestQuery:
  date: string
responses:
  200:
    schema:
      type: object
      properties:
        month: number
        week: number
        results: array
          items:
            type: number

```

```
// example: GET /results/week?date=2019-07-06
{
    "month": 7,
    "week": 1,
    "result": [
        -1,
        -1,
        5,
        4,
        3,
        7,
        1
    ]
}
```

## GET /results/month

```
summary: 한 달 동안의 점수를 가져옵니다. 데이터가 없으면 -1을 표시합니다.
requestQuery:
  date: string
responses:
  200:
    schema:
      type: object
      properties:
        month: number
        year: number
        results: array
          items:
            type: number
```

```
// example: GET /results/month?date=2019-07-06
{
    "month": 7,
    "year": 2019,
    "result": [
        -1,
        -1,
        5,
        4,
        3,
        7,
        1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
    ]
}
```

## GET /insights

```
summary: 하나의 인사이트를 가져옵니다.
requestQuery:
  user: number
    description: 사용자의 고유 아이디입니다
responses:
  200:
    schema:
      type: object
      properties:
        id: number
        content: string
        code: string
        img: string
```

```
{
    "id": 14,
    "content": "저번 달에 비해<br />이번 달은 조금 우울해 보여요<br />창문을 열고 바깥 공기를 마셔볼까요?",
    "code": "BBAA",
    "img": ""
}
```
