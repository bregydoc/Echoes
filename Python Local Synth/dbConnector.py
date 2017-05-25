import rethinkdb as r

r.connect("localhost", 28015).repl()  # 28015

cursor = r.db("test").table("authors").changes().run()
for document in cursor:
    print(document)

