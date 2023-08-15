update-svelte:
	echo "Updating Svelte"
	cd tmp; pnpm create vite@latest svelte-app --template svelte; cp ../docker/svelte/docker-compose.yml ./svelte-app; tar -czvf svelte-app.tar.gz svelte-app
	rm -rf tmp/svelte-app
	mv -f tmp/svelte-app.tar.gz public/
	echo "Svelte updated"