import sys, json

data = json.load(sys.stdin)
result = {"prediction": "success", "count": len(data)}
print(json.dumps(result))
