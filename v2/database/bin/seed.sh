read -n1 -p "WARNING: This will drop all data from the database and reseed it with the seed data. Are you sure you want to continue? [y/N]" answer;
echo '';

if [ "$answer" != "${answer#[Yy]}" ] ;then
    echo 'Seeding database...';
else
    echo 'Aborting...';
    exit 1;
fi

sql_content=$(cat $IIMB_HOME/database/seed.dev.sql);
docker-compose -f docker-compose.dev.yml exec database mysql --user=root --password=password --database=iimb --execute="$sql_content";
