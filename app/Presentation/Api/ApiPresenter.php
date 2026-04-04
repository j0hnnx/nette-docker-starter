<?php

declare(strict_types=1);

namespace App\Presentation\Api;

use Nette\Application\UI\Presenter;

class ApiPresenter extends Presenter
{
    public function actionDefault(): void
    {
        $this->sendJson([
            'status' => 'ok',
            'message' => 'Nette API is working!'
        ]);
    }
}