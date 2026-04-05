<?php declare(strict_types=1);

namespace App\Core;

use Nette;
use Nette\Application\Routers\RouteList;


final class RouterFactory
{
	use Nette\StaticClass;

	public static function createRouter(): RouteList
	{
		$router = new RouteList;
        // TODOS
        $router->addRoute('/api/todos', 'Api:todos');
        $router->addRoute('/api/todos[/<id \d+>]', 'Api:todo');

        // DEFAULT CALLS
        $router->addRoute('/api/<action>[/<id>]', 'Api:<action>');
        $router->addRoute('<presenter>/<action>[/<id>]', 'Home:default');
		return $router;
	}
}
