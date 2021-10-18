
## MySQL Setup

<https://hub.docker.com/_/mysql>

<br/>

+ Server Verion
```
  5.7.35 MySQL Community Server (GPL)
```
###

+ docker-compose.yml

![img.png](img.png)


```

    MYSQL_DATABASE : 컨테이너의 이미지를 시작 하면서 지정한 데이터베이스를 생성
    MYSQL_USER : MySQL 사용자 아이디
    MYSQL_PASSWORD : MySQL 사용자 암호
    MYSQL_ROOT_PASSWORD : 필수 변수이며, MySQL의 root 암호
    
```

###

+ Command Overview


| Command Line  | Allows you to... | 
  | :------------ | :-----------: | 
| git checkout 20-dev-setup | '29-dev-setup' 브랜치로 전환   |
| scp -i \~/.ssh/PPB-AWS.pem neo@15.164.79.244:\~/20211013.sql . | AWS.pem SSH 명령어로 로컬 접속 |
| docker exec -it neo-mysql-1 bash | mysql container 에 bash shell 생성 | 


#




