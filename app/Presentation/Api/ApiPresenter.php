<?php

declare(strict_types=1);

namespace App\Presentation\Api;

use App\Model\TodoRepository;
use Nette\Application\UI\Presenter;
use Nette\Utils\Json;

class ApiPresenter extends Presenter
{
    /**
     * @var TodoRepository
     */
    private TodoRepository $todoRepository;

    /**
     * @param TodoRepository $todoRepository
     */
    public function __construct(
        TodoRepository $todoRepository
    )
    {
        parent::__construct();
        $this->todoRepository = $todoRepository;
    }

    public function actionDefault(): void
    {
        $this->sendJson([
            'status' => 'ok',
            'message' => 'Nette API is working!'
        ]);
    }

    public function actionTodos(): void
    {
        $method = $this->getHttpRequest()->getMethod();

        if ($method === 'GET')
        {
            $rows = $this->todoRepository->findAll();
            $data = array_map(fn($r) => [
                'id' => $r->id,
                'text' => $r->text,
                'done' => (bool) $r->done,
            ], array_values($rows));
            $this->sendJson($data);
        }

        if ($method === 'POST')
        {
            $body = Json::decode($this->getHttpRequest()->getRawBody(), true);
            $this->todoRepository->create($body['text']);
            $this->sendJson(['status' => 'created']);
        }
    }

    public function actionTodo(int $id): void
    {
        $method = $this->getHttpRequest()->getMethod();

        if ($method === 'PATCH')
        {
            $body = Json::decode($this->getHttpRequest()->getRawBody(), true);
            $this->todoRepository->update($id, $body['done']);
            $this->sendJson(['status' => 'updated']);
        }

        if ($method === 'DELETE')
        {
            $this->todoRepository->delete($id);
            $this->sendJson(['status' => 'deleted']);
        }
    }
}