docker run --name pg -v /home/roee/pg/data/upstay/:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=pass1234 -d postgres