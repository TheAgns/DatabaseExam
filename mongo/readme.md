MongoDB cluster
###  Step 1
```bash
docker-compose up -d
```

###  Step 2
```bash
docker-compose exec configsvr01 sh -c "mongosh < /scripts/init-configserver.js"

docker-compose exec shard01-a sh -c "mongosh < /scripts/init-shard01.js"
docker-compose exec shard02-a sh -c "mongosh < /scripts/init-shard02.js"
```

###  Step 3
```bash
docker-compose exec router01 sh -c "mongosh < /scripts/init-router.js"
```

###  Step 4
```bash
docker-compose exec router01 mongosh --port 27017

sh.enableSharding("Store")

db.adminCommand( { shardCollection: "MyDatabase.cart", key: { oemNumber: "hashed", zipCode: 1, supplierId: 1 } } )
```